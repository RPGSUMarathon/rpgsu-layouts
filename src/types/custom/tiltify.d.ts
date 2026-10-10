export interface TiltifyTokenResponse {
    access_token: string
    expires_in: number
    scope: string
    token_type: string
}

export interface TiltifyTokenData {
    access_token: string
    expires_at: Date
}

export interface TiltifyCampaignData {
    data: {
        total_amount_raised: {
            currency: string
            value: string
        }
    }
}

export interface TiltifyRawDonation {
    id: string
    donor_name: string
    donor_comment: string
    amount: {
        value: string
        currency: string
    }
    completed_at: string
}

export interface TiltifyDonation {
    id: string
    name: string
    amount: number
    comment: string
    currency: string
    timestamp: Date
}

export interface TiltifyMilestone {
    id: string
    name: string
    amount: { value: string }
}

export interface DonationGoal {
    name: string
    amount: number
}

export interface TiltifyPollData {
    data: {
        active: boolean
        id: string
        name: string
        options: {
            id: string
            name: string
            inserted_at: string
            updated_at: string
            amount_raised: {
                value: string
                currency: string
            }
            legacy_id: number
        }[]
        inserted_at: string
        updated_at: string
        amount_raised: {
            value: string
            currency: string
        }
        legacy_id: number
    }[]
    metadata: {
        after: string | null
        limit: number
        before: string | null
    }
}

export interface TiltifyPoll {
    id: string
    name: string
    active: boolean
    amount: number
    currency: string
    options: {
        id: string
        name: string
        amount: number
        currency: string
    }[]
    updated_at: string
    created_at: string
}

export interface DonationQueueItem {
    id: string
    name: string
    amount: number
    comment?: string
    currency: string
    timestamp: Date | string
}

export interface ProcessTiltifyDonationRequest {
    donationId: string
    includeComment?: boolean
}
