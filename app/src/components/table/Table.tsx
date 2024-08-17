import React, { useEffect } from 'react';
import {
  Row,
  ColumnDef,
  flexRender,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  InitialTableState,
  getExpandedRowModel,
} from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';

import Empty from 'components/common/Empty';
import Loading from 'components/common/Loading';

import { classNames } from 'utils/className';
import { joinStrings } from 'utils/string';

import { Any, DefaultObject } from 'types/common';

// import history from '$/utils/history';
import config from 'config/config';

export const ACTION_ID = 'action';

export interface RowProps extends Row<DefaultObject> {
  isExpanded?: boolean;
}

interface Colspan {
  colspanIds: string[];
  startId: string;
  length: number;
}

interface FixedColumns {
  title: string;
  position: string;
  className?: string;
}

interface StyledColumns {
  title: string;
  className: string;
}

type MyTableProps<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  loading: boolean;
  sorting?: boolean;
  initialState?: InitialTableState; // Need to make easier to use, possibly wrapper.
  selectedRows?: number[];
  linkTo?: (original: T) => string;
  onRowClick?: (row: Row<T>) => void;
  getRowCanExpand?: (row: Row<T>) => boolean;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  getSubRows?: (row: T) => Any;
  emptyMessage: string;
  emptyTrailing?: JSX.Element | null;
  className?: string;
  classes?: {
    table?: string;
    tableHeader?: string;
    tableBody?: string;
    tableFooter?: string;
    tableHeaderRow?: string;
    tableBodyRow?: (original?: T) => string;
    tableHeaderCell?: string;
    tableBodyCell?: string;
  };
  conditionalClasses?: (original: T) => string;
  loadingClassName?: string;
  emptyClassName?: string;
  parentClassName?: string;
  colSpan?: Colspan;
  showEmpty?: boolean;
  rowExpanded?: (expand?: ExpandedState) => ExpandedState;
  fixedColumns?: FixedColumns[];
  styledColumns?: StyledColumns[];
  onSortCallback?: (name: string, sortOrder: string) => void;
};

function Table<T>(props: MyTableProps<T>) {
  const {
    data,
    columns,
    loading,
    sorting = true,
    initialState,
    selectedRows,
    linkTo,
    classes,
    className,
    getSubRows,
    onRowClick,
    emptyMessage,
    emptyTrailing,
    emptyClassName,
    getRowCanExpand,
    loadingClassName,
    renderSubComponent,
    conditionalClasses,
    parentClassName,
    colSpan,
    showEmpty = false,
    rowExpanded,
    fixedColumns,
    styledColumns,
    onSortCallback,
  } = props;

  const history = useHistory();

  const sortable = sorting && !loading;
  const isTableEmpty = !data?.length;

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  useEffect(() => {
    const rowExpand = rowExpanded ? rowExpanded(expanded) : {};

    setExpanded(rowExpand);
  }, [rowExpanded?.(expanded)]);

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows,
    enableSorting: sortable,
    manualPagination: true,
    initialState,
    getRowCanExpand,
    enableSortingRemoval: false, // Skip reset state in sorting
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const onLinkRowClick = (e: React.MouseEvent<HTMLTableRowElement>, link: string) => {
    if (e.ctrlKey || e.metaKey) {
      //   window.open(`${window.location.origin}${config.endpoints.vyaguta.okr}${link}`, '_blank');

      return;
    }

    history.push(link);
  };

  const isRowSelected = (id: number) => {
    return selectedRows?.includes(id);
  };

  const showEmptyContent = (!loading && isTableEmpty) || showEmpty;

  return (
    <div className={classNames('overflow-hidden  bg-white', parentClassName)}>
      <div
        className={classNames('overflow-x-auto', className, {
          'overflow-x-hidden': loading,
        })}
      >
        <table className={classNames('w-full', { 'bg-white': !classes?.table }, classes?.table)}>
          <thead className={classNames('border-b-2 border-grey-15', classes?.tableHeader)}>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <tr className={classNames(classes?.tableHeaderRow)} key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    const width = header.getSize().toString();

                    const hasSubHeaders = header.subHeaders?.length > 1;

                    const { accessorKey } = header.column.columnDef as Any;

                    return (
                      <th
                        {...{
                          key: header.id,
                          colSpan: header.colSpan,
                          style: {
                            minWidth: width.concat('px'),
                          },
                        }}
                        className={classNames(
                          `px-4 py-[10px] text-left text-xs font-semibold text-grey-80`,
                          classes?.tableHeaderCell,
                          // TODO: Need to refactor this code
                          `${fixedColumns?.find(item => item.title === accessorKey)?.className}`,
                          `${styledColumns?.find(item => item.title === accessorKey)?.className}`,
                          {
                            '!min-w-0': header.isPlaceholder,
                            'py-0': header.subHeaders.length,
                          }
                        )}
                      >
                        <div
                          role="button"
                          onKeyUp={() => {}}
                          tabIndex={0}
                          className={classNames(
                            'flex items-center text-grey-60',
                            {
                              'cursor-pointer whitespace-nowrap':
                                sortable && header.column.getCanSort(),
                              'text-tertiary-blue-40':
                                !isTableEmpty && header.column.getIsSorted() && !loading,
                              'cursor-default': isTableEmpty || !header.column.getCanSort(),
                              'mt-6 text-xs font-normal': header.column.parent,
                              relative: hasSubHeaders,
                            },
                            classes?.tableHeaderCell
                          )}
                          onClick={e => {
                            const toggleSortingHandler = header.column.getToggleSortingHandler();

                            if (toggleSortingHandler && header.column.getCanSort()) {
                              toggleSortingHandler(e);

                              if (onSortCallback) {
                                const sortedOrder = header.column.getIsSorted();
                                const callbackSortOrder =
                                  !sortedOrder || sortedOrder === 'asc' ? 'DESC' : 'ASC';
                                onSortCallback(
                                  header.column.columnDef.header as string,
                                  callbackSortOrder
                                );
                              }
                            }
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={classNames({
                                'absolute top-2': hasSubHeaders,
                              })}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>
                          )}
                          {!isTableEmpty &&
                            header.column.getIsSorted() &&
                            !loading &&
                            !header.isPlaceholder && (
                              <span
                                className={classNames('triangle', {
                                  'triangle--up': header.column.getIsSorted() === 'asc',
                                  'absolute right-[100px] top-4': hasSubHeaders,
                                })}
                              />
                            )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          {!loading && !isTableEmpty && (
            <tbody className={classNames(classes?.tableBody)}>
              {table.getRowModel().rows.map(row => {
                const { id } = row.original as Any;
                const { original } = row as Any;

                return (
                  <>
                    <tr
                      className={classNames(
                        'lf-table__row cursor-pointer border-b border-solid border-grey-10',
                        {
                          'bg-tertiary-blue-15': isRowSelected(id),
                        },
                        classes?.tableBodyRow && classes?.tableBodyRow(original),
                        conditionalClasses && conditionalClasses(row.original)
                      )}
                      key={row.id}
                      onClick={e => {
                        e.stopPropagation();

                        if (linkTo) onLinkRowClick(e, linkTo(original));

                        if (onRowClick) onRowClick(row);
                      }}
                    >
                      {row.getVisibleCells().map((cell, index) => {
                        if (colSpan?.colspanIds.includes(cell.column.id) && original.isColspan) {
                          return null;
                        }

                        const { accessorKey } = cell.column.columnDef as Any;

                        return (
                          <td
                            colSpan={
                              cell.column.id === colSpan?.startId && original.isColspan
                                ? colSpan.length
                                : 0
                            }
                            className={classNames(
                              'px-4 py-3 text-sm text-grey-80',
                              // TODO: Need to refactor this code
                              `${
                                fixedColumns?.find(item => item.title === accessorKey)?.className
                              }`,
                              {
                                'pr-4': cell.column.id === ACTION_ID,
                              },
                              classes?.tableBodyCell
                            )}
                            key={joinStrings(cell.id, index)}
                            style={{ width: cell.column.getSize() }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>

                    {row.getIsExpanded() && renderSubComponent && (
                      <tr>
                        <td colSpan={row.getVisibleCells().length}>
                          {renderSubComponent({ row })}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          )}
        </table>

        {loading && <Loading hasBackground className={classNames('h-80', loadingClassName)} />}

        {showEmptyContent && (
          <Empty
            message={emptyMessage}
            className={classNames('!h-80 ', emptyClassName)}
            trailing={emptyTrailing}
          />
        )}
      </div>
    </div>
  );
}

export default Table;
