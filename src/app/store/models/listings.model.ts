export interface Listing {
    type: string,
    features: Array<Feature>
}

export interface Feature {
    type: string,
    geometry: {
        type: string,
        coordinates: Array<number>
    },
    properties: {
        phoneFormatted?: string,
        phone?: string,
        address?: string,
        city?: string,
        country?: string,
        crossStreet?: string,
        postalCode?: string,
        state?: string,
        cc?: string,
        fees: {
            app: number,
            admin: number
        },
        gallery: Array<string>,
        plans: Array<{
            rooms: string,
            size: string,
            connectionType: string,
            price: number,
        }>,
        policySummary: string,
        schoolDistrict: string,
        yearBuilt: number,
        yearOfRenovation: number,
        listingId: number,
        avgCost: number,
        amenities: Array<{
            iconName: string,
            nameOfAmenity: string
        }>
    }
}
