import {
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    TableCellLayout,
    TableColumnDefinition,
    createTableColumn,
    useFluent,
    useScrollbarWidth,
} from "@fluentui/react-components";
import { ExternalLink } from "./ExternalLink";
import trumpLitigationData from "./data/trump-litigation-data.json";
import {
    RowRenderer,
    DataGridBody,
    DataGridRow,
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
} from "@fluentui-contrib/react-data-grid-react-window";
import React from "react";

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
    // citation 1
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
    // date filed
    createTableColumn<LegalCase>({
        columnId: "dateFiled",
        compare: (a, b) => {
            return new Date(a.dateFiled).getTime() - new Date(b.dateFiled).getTime();
        },
        renderHeaderCell: () => {
            return "Date filed";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>{new Date(item.dateFiled).toLocaleDateString()}</TableCellLayout>
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
                <TableCellLayout truncate>
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
    // government action
    createTableColumn<LegalCase>({
        columnId: "governmentAction",
        renderHeaderCell: () => {
            return "Government action";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.governmentAction}</TableCellLayout>;
        },
    }),
    // alleged violated laws
    createTableColumn<LegalCase>({
        columnId: "allegedViolatedLaws",
        renderHeaderCell: () => {
            return "Alleged violated laws";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.allegedViolatedLaws}</TableCellLayout>;
        },
    }),
    // current ruling
    createTableColumn<LegalCase>({
        columnId: "currentRuling",
        compare: (a, b) => {
            return a.currentRuling.localeCompare(b.currentRuling);
        },
        renderHeaderCell: () => {
            return "Current ruling";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.currentRuling}</TableCellLayout>;
        },
    }),
    // who's winning
    createTableColumn<LegalCase>({
        columnId: "whosWinning",
        compare: (a, b) => {
            return a.whosWinning.localeCompare(b.whosWinning);
        },
        renderHeaderCell: () => {
            return "Who's winning";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.whosWinning}</TableCellLayout>;
        },
    }),
    // status
    createTableColumn<LegalCase>({
        columnId: "status",
        compare: (a, b) => {
            return a.status.localeCompare(b.status);
        },
        renderHeaderCell: () => {
            return "Status";
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.status}</TableCellLayout>;
        },
    }),
    // last update
    createTableColumn<LegalCase>({
        columnId: "lastUpdate",
        compare: (a, b) => {
            return new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime();
        },
        renderHeaderCell: () => {
            return "Last update";
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>{new Date(item.lastUpdate).toLocaleDateString()}</TableCellLayout>
            );
        },
    }),
    // comments
    createTableColumn<LegalCase>({
        columnId: "comments",
        renderHeaderCell: () => {
            return "Comments";
        },
        renderCell: (item) => {
            return <TableCellLayout truncate>{item.comments}</TableCellLayout>;
        },
    }),
];

const renderRow: RowRenderer<LegalCase> = ({ item, rowId }, style) => (
    <DataGridRow key={rowId} style={style}>
        {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
    </DataGridRow>
);

export const TrumpLitigationDataGrid = () => {
    const refMap = React.useRef<Record<string, HTMLElement | null>>({});
    const { targetDocument } = useFluent();
    const scrollbarWidth = useScrollbarWidth({ targetDocument });
    return (
        // https://react.fluentui.dev/?path=/docs/components-datagrid--docs
        // https://microsoft.github.io/fluentui-contrib/react-data-grid-react-window/?path=/docs/packages-react-data-grid-react-window--docs
        <DataGrid
            items={cases}
            columns={columns}
            sortable
            resizableColumns
            selectionMode="single"
            focusMode="cell"
        >
            <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
                <DataGridRow>
                    {({ renderHeaderCell, columnId }, dataGrid) => (
                        <Menu openOnContext>
                            <MenuTrigger>
                                <DataGridHeaderCell ref={(el) => (refMap.current[columnId] = el)}>
                                    {renderHeaderCell()}
                                </DataGridHeaderCell>
                            </MenuTrigger>
                            <MenuPopover>
                                <MenuList>
                                    <MenuItem
                                        onClick={dataGrid.columnSizing_unstable.enableKeyboardMode(
                                            columnId,
                                        )}
                                    >
                                        Keyboard column resizing
                                    </MenuItem>
                                </MenuList>
                            </MenuPopover>
                        </Menu>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<LegalCase> itemSize={64} height={900}>
                {renderRow}
            </DataGridBody>
        </DataGrid>
    );
};
