import React from 'react';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

interface VirtualizedListProps<T> {
  itemCount: number; // Total number of items
  height?: number; // Height of the visible area
  width?: number; // Width of the container
  itemRenderer: (index: number, key: string) => React.ReactNode; // Function to render each item
}

function VirtualizedList<T>({ itemCount, height, width, itemRenderer }: VirtualizedListProps<T>) {
  // Cache for dynamic row heights
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 30, // Adjust based on your item height
    keyMapper: index => index, // Use index as key
  });

  // Function to render each row
  const rowRenderer = ({
    index,
    key,
    parent,
    style,
  }: {
    index: number;
    key: string;
    parent: MeasuredCellParent; // Using `any` here due to TypeScript limitations
    style: React.CSSProperties;
  }) => {
    return (
      <CellMeasurer key={key} cache={cache} parent={parent}>
        <div style={style}>{itemRenderer(index, key)}</div>
      </CellMeasurer>
    );
  };

  return (
    <AutoSizer>
      {({ height: containerHeight, width: containerWidth }) => (
        <List
          height={containerHeight}
          width={containerWidth}
          rowCount={itemCount}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          overscanRowCount={10} // Adjust based on your performance needs
        />
      )}
    </AutoSizer>
  );
}

export default VirtualizedList;
