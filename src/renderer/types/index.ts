
export type PieChartDataType = {
    platform: string;
    percentage: number;
}

// interface for pei chat data...
export interface PieChartDataInterface {
    platform: string;
    percentage: number;
}

export type CoinDeskBitcoinData = {
    bpi: { [key: string]: number };
    disclaimer: string;
    time: {
        updated: string;
        updatedISO: string;
    }
}

export type ParsedCoinDeskData = {
    date: Date;
    value: number;
}
