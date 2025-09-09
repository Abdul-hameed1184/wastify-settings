import { LoadMoreTable } from "../LoadMoreTable"

export const BillList = () => {
    const columns = [
        {header: "billPeriod", accessor: "Period"},
        {header: "billAmount", accessor: "Bill"},
                {header: "discountPercentage", accessor: "Discount Percent"},
                        {header: "discountAmount", accessor: "Discount Amount"},
                        {header: "discountAmount", accessor: "Amount"},
                                {header: "paymentStatus", accessor: "Status"}
                                        {header: "", accessor: "Actions"}
    ]
    return (
        <LoadMoreTable 
        columns={[]} 
        data={[]} 
        total={0} 
        loaded={0} 
        loadMore={function (): void {
            throw new Error("Function not implemented.")
        } } />
    )
}