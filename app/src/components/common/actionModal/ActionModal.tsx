import classNames from 'classnames';
import { FiMoreVertical } from 'react-icons/fi';
import React, { useEffect, useRef, useState } from 'react';

import { CellData, DefaultObject } from 'types/common';

import { tertiaryBlue60, tertiaryOrange80 } from 'constants/color';

import PopOver from '../popOver';

interface ActionModalProps {
  cellData: CellData[];
  rowData: DefaultObject;
}

function ActionModal(props: ActionModalProps) {
  const { cellData, rowData } = props;

  const [openMenu, setOpenMenu] = useState(false);
  const cellRef = useRef<null | HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenu(prev => !prev);
  };

  useEffect(() => {
    const closeMenuIfOpen = (e: MouseEvent) => {
      if (!cellRef.current?.contains(e.target as HTMLInputElement)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', closeMenuIfOpen);

    return () => {
      document.removeEventListener('mousedown', closeMenuIfOpen);
    };
  }, []);

  return (
    <div
      ref={cellRef}
      role="button"
      className={classNames('menu-container', {
        'menu-container--active': openMenu,
      })}
      onClick={toggleMenu}
      onKeyUp={() => {}}
      tabIndex={0}
    >
      <PopOver
        interactive
        position="left"
        trigger="click"
        theme="light"
        color="white"
        open={openMenu}
        html={
          <ul className="action-dialog">
            {cellData.map((data: CellData) => (
              <li
                className={classNames(
                  'flex item-center gap-x-2 px-3 py-3 cursor-pointer hover:bg-grey-100',
                  data.className
                )}
                aria-hidden="true"
                key={data.name}
                onClick={() => {
                  data.state(rowData);
                }}
              >
                <div className="center">{data.icon}</div>
                <span className="p-2x">{data.name}</span>
              </li>
            ))}
          </ul>
        }
      >
        <div className="menu-button-icon flex justify-center" aria-label="Menu Button">
          <FiMoreVertical size={24} color={openMenu ? tertiaryOrange80 : 'inherit'} />
        </div>
      </PopOver>
    </div>
  );
}

export default ActionModal;
