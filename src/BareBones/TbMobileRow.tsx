import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { DataGridCard } from '../DataGrid';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from './DetailComponentProps';

export interface TbMobileRowProps {
    columns: ColumnModel[];
    onRowClick(row: any): void;
    row: any;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
}

export const TbMobileRow: React.FunctionComponent<TbMobileRowProps> = ({
    columns,
    onRowClick,
    row,
    rowSelectionEnabled,
    selection,
    detailComponent,
}: TbMobileRowProps) => {
    return (
        <DataGridCard
            columns={columns}
            item={row}
            onClickCallback={onRowClick}
            rowSelectionEnabled={rowSelectionEnabled}
            selection={selection}
            detailComponent={detailComponent}
        />
    );
};
