import {
    TableColumnDefinition,
    createTableColumn,
    TableCellLayout,
    useScrollbarWidth,
    useFluent,
} from "@fluentui/react-components";
import {
    DataGridBody,
    DataGrid,
    DataGridRow,
    DataGridHeader,
    DataGridCell,
    DataGridHeaderCell,
    RowRenderer,
} from "@fluentui-contrib/react-data-grid-react-window";
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
let caseColumns: TableColumnDefinition<LegalCase>[];
// eslint-disable-next-line prefer-const
caseColumns = [
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

const renderRow: RowRenderer<LegalCase> = ({ item, rowId }, style) => (
    <DataGridRow<LegalCase> key={rowId} style={style}>
        {({ renderCell }) => <DataGridCell focusMode="group">{renderCell(item)}</DataGridCell>}
    </DataGridRow>
);

export const DemoDataGrid = () => {
    const { targetDocument } = useFluent();
    const scrollbarWidth = useScrollbarWidth({ targetDocument });

    return (
        <DataGrid
            items={cases}
            columns={caseColumns}
            focusMode="cell"
            sortable
            selectionMode="multiselect"
        >
            <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
                <DataGridRow>
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<LegalCase> itemSize={50} height={1100}>
                {renderRow}
            </DataGridBody>
        </DataGrid>
    );
};
