import dayjs from 'dayjs'

import { createRequire} from 'module'
const require = createRequire(import.meta.url) 
const { serve } = require('@upstash/workflow/express')
import Subscription from '../models/subscription.model.js'

const REMINDERS = [7,5,2,1]

export const sendReminders = serve(async () => {
    const {subscriptionId} = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId)

    if(!subscription || subscription.status !== 'active') {
        return {
            status: 'skipped',
            message: 'Subscription not found or not active'
        }
    }
    const renewalDate = dayjs(subscription.renewalDate)

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping Workflow`);
        return
        
    }

    for(const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`)
    }
})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}

const sleepUntilReminder = async (context, lavel, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
    
}

const triggerReminder = async (context, label) =>{
    return await context.run('send reminder', () => {
        console.log(`Triggering ${label} reminder`);
        // send email, sms, push notification...
    })
}