import {
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
} from "@fluentui/react-components";

type Item = {
    id: string;
    name: string;
};

const items: Item[] = [
    {
        id: "1",
        name: "Mark",
    },
];

// doing some jank here to work around a Prettier bug in TSX files
// if we can remove these without changing the code, let's do it
/* prettier-ignore */
let columns: TableColumnDefinition<Item>[];
// eslint-disable-next-line prefer-const
columns = [
    createTableColumn<Item>({
        columnId: "id",
        compare: () => {
            return 0;
        },
        renderHeaderCell: () => {
            return "ID";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.id}</TableCellLayout>;
        },
    }),
    createTableColumn<Item>({
        columnId: "name",
        compare: (a, b) => {
            return a.name.localeCompare(b.name);
        },
        renderHeaderCell: () => {
            return "Author";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.name}</TableCellLayout>;
        },
    }),
];

export const Default = () => {
    return (
        <DataGrid items={items} columns={columns}>
            <DataGridHeader>
                <DataGridRow
                    selectionCell={{
                        checkboxIndicator: { "aria-label": "Select all rows" },
                    }}
                >
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody>
                {({ item, rowId }) => (
                    <DataGridRow
                        key={rowId}
                        selectionCell={{
                            checkboxIndicator: { "aria-label": "Select row" },
                        }}
                    >
                        {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    );
};
