export interface Bill {
    _id: string,
    description: string,
    amount: number,
    dueDate: Date,
    category: string,
    status: 'Pending' | 'Paid' | 'Late',


}
