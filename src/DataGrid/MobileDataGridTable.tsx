import GridList from '@material-ui/core/GridList';
import * as React from 'react';

import { ITbTableInstance } from 'tubular-react-common';
import DetailComponentProps from '../BareBones/DetailComponentProps';
import { TbMobileRow } from '../BareBones/TbMobileRow';
import { TbRowProps } from '../BareBones/TbRow';
import { TbSelection } from '../utils/Selection';

export interface MobileDataGridTableProps {
    tbTableInstance: ITbTableInstance;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    onRowClick?(row: any): void;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
}

const generateOnRowClickProxy = (onRowClick: any) => {
    return (row: any) => {
        return () => {
            if (onRowClick) {
                onRowClick(row);
            }
        };
    };
};

export const MobileDataGridTable: React.FunctionComponent<MobileDataGridTableProps> = ({
    tbTableInstance,
    rowComponent,
    onRowClick,
    detailComponent,
    rowSelectionEnabled,
    selection,
}: MobileDataGridTableProps) => {
    const RowComponent = rowComponent ? rowComponent : TbMobileRow;
    const onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : (_row: any): (() => void) => void 0;

    return (
        <GridList cellHeight="auto" cols={1}>
            {tbTableInstance.state.data.map((row: any, index: number) => (
                <RowComponent
                    columns={tbTableInstance.state.columns}
                    row={row}
                    rowIndex={index}
                    onRowClick={onRowClickProxy(row)}
                    key={index}
                    detailComponent={detailComponent || null}
                    rowSelectionEnabled={rowSelectionEnabled}
                    selection={selection}
                />
            ))}
        </GridList>
    );
};
