//import { Element } from "@prisma/client";
import { Element} from "@/lib/generated/prisma";

import { columns } from "./colums";
import { DataTable } from "./data-table";

export type TableDataProps = {
    elements: Element[];
};
export function TableData(props: TableDataProps) {
    const {elements} = props;
    return (
        <div className="py-10">
        <DataTable columns={columns} data={elements} />
    </div>
    
    ) ;
}
