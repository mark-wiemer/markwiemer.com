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
import { ExternalLink } from "./ExternalLink";
import trumpLitigationData from "./data/trump-litigation-data.json";

type LegalCase = {
    citation1: string;
    citation1URL: string;
    citation2: string;
    citation2URL: string;
    citation3: string;
    citation3URL: string;
    index: string;
    topic: string;
    executiveAction: string;
    executiveActionURL: string;
    dateFiled: string;
    governmentAction: string;
    allegedViolatedLaws: string;
    lastUpdate: string;
    whosWinning: string;
    currentRuling: string;
    status: string;
    comments: string;
};

const cases: LegalCase[] = trumpLitigationData;

// doing some jank here to work around a Prettier bug in TSX files
// if we can remove these without changing the code, let's do it
let columns: TableColumnDefinition<LegalCase>[];
// eslint-disable-next-line prefer-const
columns = [
    // citation
    createTableColumn<LegalCase>({
        columnId: "citation",
        compare: (a, b) => {
            return a.citation1.localeCompare(b.citation1);
        },
        renderHeaderCell: () => {
            return "Citation";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    <ExternalLink href={item.citation1URL}>{item.citation1}</ExternalLink>
                </TableCellLayout>
            );
        },
    }),
    // topic
    createTableColumn<LegalCase>({
        columnId: "topic",
        compare: (a, b) => {
            return a.topic.localeCompare(b.topic);
        },
        renderHeaderCell: () => {
            return "Topic";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.topic}</TableCellLayout>;
        },
    }),
    // executive action
    createTableColumn<LegalCase>({
        columnId: "executiveAction",
        compare: (a, b) => {
            return a.executiveAction.localeCompare(b.executiveAction);
        },
        renderHeaderCell: () => {
            return "Executive action";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    {item.executiveActionURL ? (
                        <ExternalLink href={item.executiveActionURL}>
                            {item.executiveAction}
                        </ExternalLink>
                    ) : (
                        item.executiveAction
                    )}
                </TableCellLayout>
            );
        },
    }),
];

export const TrumpLitigationDataGrid = () => {
    return (
        // https://react.fluentui.dev/?path=/docs/components-datagrid--docs
        // todo use https://microsoft.github.io/fluentui-contrib/react-data-grid-react-window/?path=/docs/packages-react-data-grid-react-window--docs
        <DataGrid
            items={cases}
            columns={columns}
            sortable
            selectionMode="single"
            getRowId={(item) => item.id}
            focusMode="composite"
            resizableColumns
        >
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
