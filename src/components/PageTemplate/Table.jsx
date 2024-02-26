import  { forwardRef, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { AgGridReact } from 'ag-grid-react';
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg';
import {
  MdOutlineFirstPage,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineLastPage,
} from 'react-icons/md';
import {setCookie,getCookie} from "../../assets/Cookie.js";

const koreanTexts = {
  pinColumn: '컬럼 고정',
  autosizeThiscolumn: '이 컬럼 크기 자동조절',
  autosizeAllColumns: '모든 컬럼 크기 자동조절',
  selectAll: '전체 선택',
  resetColumns: '컬럼 초기화',
};

const saveVisibleColumnsToCookie = (event, props) => {
  const columnsState = event.api.getAllDisplayedColumns();
  let headerNames = '';

  for (let i = 0; i < columnsState.length; i++) {
    const column = columnsState[i];
    if (column.visible) {
      headerNames += `${headerNames ? ',' : ''}${columnsState[i].colDef.field}`;
    }
  }
  setCookie(props.id, headerNames);
};

const applySavedColumnState = (grid, props) => {
  if (props?.onGridReady) {
    props.onGridReady();
  }

  const saved = getCookie(props.id);

  if ((props.isColumnCookieSave || props.isColumnCookieSave === undefined) && saved) {
    const visibleColumns = saved.split(',').map(headerName => headerName.trim());
    const allColumnsState = grid.api.getColumnState();
    allColumnsState.forEach(columnState => {
      const field = columnState.colId;
      const isVisible = visibleColumns.includes(field);
      if (isVisible) {
        grid.api.setColumnVisible(field, true);
      } else {
        grid.api.setColumnVisible(field, false);
      }
    });
  }
};

const onFirstDataRendered = (grid, props) => {
  if (props?.onFirstDataRendered) {
    props.onFirstDataRendered(grid);
  }
  if (!props.suppressRowTransform) {
    grid.api.sizeColumnsToFit();
  }
};

const useGridLogic = props => {
  return {
    saveVisibleColumnsToCookie: useCallback(
      event => saveVisibleColumnsToCookie(event, props),
      [props],
    ),
    applySavedColumnState: useCallback(grid => applySavedColumnState(grid, props), [props]),
    onFirstDataRendered: useCallback(grid => onFirstDataRendered(grid, props), [props]),
  };
};



const Table = forwardRef((props, ref) => {
  const { saveVisibleColumnsToCookie, applySavedColumnState, onFirstDataRendered } =
    useGridLogic(props);

  const onToolPanelVisibleChanged = useCallback(params => {
    const { api, source } = params;
    if (!api.getSelectedRows()[0]) {
      api.closeToolPanel();
    }
    const target = document.querySelector('.ag-tool-panel-wrapper');
    if (source) {
      // animation 실행 시간과 setTimeOut 시간을 맞춰줘야 함.
      setTimeout(() => target.classList.add('ag-visible'), 300);
    } else {
      target.classList.add('ag-animation-slideOut');
      setTimeout(() => {
        target.classList.remove('ag-visible');
        target.classList.remove('ag-animation-slideOut');
      }, 300);
    }
  }, []);

  return (
    <Wrapper
      className="ag-theme-alpine"
      width={props.width ?? '100%'}
      height={props.height ?? '300px'}
    >
      <AgGridReact
        {...props}
        gridOptions={
          props.isColumnCookieSave || props.isColumnCookieSave === undefined
            ? {
                onColumnVisible: saveVisibleColumnsToCookie,
                localeText: koreanTexts,
              }
            : { localeText: koreanTexts }
        }
        ref={ref}
        defaultColDef={{
          resizable: true,
          sortable: true,
          ...props.defaultColDef,
        }}
        onCellKeyDown={({ event, api }) => {
          if (!event) return;

          if (api.getSideBar()) {
            switch (event.key) {
              case 'Escape':
                api.closeToolPanel();
                break;
              case '1':
              case '2':
              case '3':
              case '4':
                if (event.altKey) {
                  api.openToolPanel(api.getSideBar().toolPanels[event.key - 1]?.id);
                }
                break;
              default:
                break;
            }
          }
        }}
        onGridReady={applySavedColumnState}
        onFirstDataRendered={onFirstDataRendered}
        headerHeight={33}
        rowHeight={30}
        onToolPanelVisibleChanged={onToolPanelVisibleChanged}
      />
    </Wrapper>
  );
});

Table.displayName = 'Table';

export const PaginationTable = forwardRef((props, ref) => {
  const { saveVisibleColumnsToCookie, applySavedColumnState, onFirstDataRendered } = useGridLogic(
    props,
    ref,
  );

  const [, setCurPage] = useState(0);
  const [, setTotalPage] = useState(0);
  const onPaginationChanged = params => {
    if (ref.current) {
      if (params.newData) {
        ref.current?.api.paginationGoToPage(0);
      }
      if (params.newData || params.newPage || params.keepRenderedRows) {
        setCurPage(ref.current?.api.paginationGetCurrentPage());
        setTotalPage(ref.current?.api.paginationGetTotalPages());
      }
    }
  };

  return (
    <>
      <Wrapper
        className="ag-theme-alpine"
        width={props.width ?? '100%'}
        height={props.height ?? '300px'}
      >
        <AgGridReact
          {...props}
          gridOptions={
            props.isColumnCookieSave || props.isColumnCookieSave === undefined
              ? {
                  onColumnVisible: saveVisibleColumnsToCookie,
                  localeText: koreanTexts,
                }
              : { localeText: koreanTexts }
          }
          ref={ref}
          defaultColDef={{
            resizable: true,
            ...props.defaultColDef,
          }}
          onGridReady={applySavedColumnState}
          onFirstDataRendered={onFirstDataRendered}
          onPaginationChanged={onPaginationChanged}
          headerHeight={33}
          rowHeight={30}
          pagination
          suppressPaginationPanel
        />
      </Wrapper>
      <BottomWrapper>
        <PaginationWrap>
          <PaginationItem onClick={() => ref.current?.api.paginationGoToFirstPage()}>
            <MdOutlineFirstPage />
          </PaginationItem>
          <PaginationItem
            onClick={() => {
              const afterTenRows =
                // eslint-disable-next-line no-unsafe-optional-chaining
                Math.floor(ref.current?.api.paginationGetCurrentPage() / 10 - 1) * 10;
              ref.current?.api.paginationGoToPage(afterTenRows);
            }}
            className="rowBackPass"
          >
            <CgChevronDoubleLeft />
          </PaginationItem>
          <PaginationItem onClick={() => ref.current?.api.paginationGoToPreviousPage()}>
            <MdOutlineKeyboardArrowLeft />
          </PaginationItem>
          {Array.from(Array(ref.current?.api?.paginationGetTotalPages()), (_, i) => i + 1)
            .slice(
              // eslint-disable-next-line no-unsafe-optional-chaining
              Math.floor(ref.current?.api?.paginationGetCurrentPage() / 10) * 10,
              // eslint-disable-next-line no-unsafe-optional-chaining
              Math.floor(ref.current?.api?.paginationGetCurrentPage() / 10 + 1) * 10,
            )
            .map(arr => (
              <PaginationItem
                onClick={() => ref.current?.api.paginationGoToPage(arr - 1)}
                aria-current={
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  ref.current?.api.paginationGetCurrentPage() + 1 === arr ? 'page' : null
                }
                key={arr}
              >
                {arr}
              </PaginationItem>
            ))}
          <PaginationItem onClick={() => ref.current?.api.paginationGoToNextPage()}>
            <MdOutlineKeyboardArrowRight />
          </PaginationItem>
          <PaginationItem
            onClick={() => {
              const beforeTenRows =
                // eslint-disable-next-line no-unsafe-optional-chaining
                Math.floor(ref.current?.api.paginationGetCurrentPage() / 10 + 1) * 10;
              ref.current?.api.paginationGoToPage(beforeTenRows);
            }}
            className="rowFrontPass"
          >
            <CgChevronDoubleRight />
          </PaginationItem>
          <PaginationItem onClick={() => ref.current?.api.paginationGoToLastPage()}>
            <MdOutlineLastPage />
          </PaginationItem>
        </PaginationWrap>
        <ResultWrap>
          <select
            onChange={({ target }) => ref.current.api.paginationSetPageSize(Number(target.value))}
          >
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="999999">전체</option>
          </select>
          Results:
          {ref.current?.api?.paginationGetTotalPages() ===
          // eslint-disable-next-line no-unsafe-optional-chaining
          ref.current?.api?.paginationGetCurrentPage() + 1
            ? ref.current?.api.paginationGetRowCount()
            : // eslint-disable-next-line no-unsafe-optional-chaining
              (ref.current?.api.paginationGetCurrentPage() + 1) *
              // eslint-disable-next-line no-unsafe-optional-chaining
              ref.current?.api.paginationGetPageSize()}{' '}
          of {ref.current?.api.paginationGetRowCount()}
        </ResultWrap>
      </BottomWrapper>
    </>
  );
});

PaginationTable.displayName = 'PaginationTable';

const slideIn = keyframes`
  0% { transform: translate(100%, 0); }
  100% { transform: translate(0, 0); }
`;

const slideOut = keyframes`
  0% { transform: translate(0, 0); }
  100% { transform: translate(100%, 0); }
`;

const Wrapper = styled.div`
  ${({ width, height }) => {
    if (width === '100%') {
      return css`
        width: ${width};
        height: ${height};
      `;
    }

    return css`
      width: ${width};
      min-width: ${width};
      height: ${height};
    `;
  }};

  border-top: none;
  flex-grow: 1;
  .ag-header-cell-label {
    justify-content: center;
    font-size: 13px;
  }

  .ag-header-row {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors && theme.colors['gray-40']}`};
    border-top: ${({ theme }) => `3px solid ${theme.colors && theme.colors['gray-60']}`};
    background: white;
  }

  & .ag-checkbox-input-wrapper {
    border: 1px solid #545454;

    &.ag-checked {
      background-color: #545454;
    }

    &::after {
      content: '\\2714';
      color: #fff;
      font-size: 14px;
      position: absolute;
      left: 1px;
      top: -3px;
    }
  }

  .ag-row {
    & div {
      font-size: 12px;
    }
    border: none;
  }

  .ag-row-even {
    background: ${({ theme }) => theme.colors && theme.colors['gray-0']};
  }

  .ag-row-odd {
    background: #f6f9fc;
  }

  .ag-side-bar {
    position: absolute !important;
    right: 0;
    height: 100%;
    max-width: 90% !important;
    z-index: 2;

    .ag-side-buttons {
      min-width: 30px;
    }

    .ag-animation-slideOut {
      display: block;
      // setTimeOut 실행 시간과 맞춰줘야 함.
      animation: ${slideOut} 0.3s;
    }

    .ag-real-hidden {
      display: none;
    }

    .ag-visible {
      display: block;
    }
  }

  .ag-tool-panel-wrapper {
    width: 800px;
    min-width: 500px !important;
    background: white;

    // setTimeOut 실행 시간과 맞춰줘야 함.
    animation: ${slideIn} 0.3s;
    border-right: none !important;
    border-left: 1px solid #d2d2d2;

    &:has(.tool-1000) {
      width: 1000px;
    }
  }

  .ag-react-container {
    width: 100%;
    height: 100%;
  }

  .ag-side-buttons {
    background: white !important;
    z-index: 500;
    border-left: 1px solid #babfc7;
  }

  .ag-side-button {
    z-index: 501;
  }

  .ag-side-bar-right {
    border: none;
  }

  .ag-side-buttons {
    padding: 0;

    .ag-side-button.ag-selected,
    .ag-side-button.ag-selected .ag-side-button-button {
      background-color: #3e3e3e;
      color: white;
    }

    & .ag-side-button-button {
      font-size: 13px;
      min-height: 100px;
      padding: 5px 0;
      border-bottom: 1px solid #9e9e9e;
      border-left: 0;

      &:hover {
        color: white;
        background-color: #455a64;
      }
    }
  }

  .ag-rich-select-list {
    height: 240px;
  }

  .ag-center-cols-viewport::-webkit-scrollbar {
    height: 6px;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 12px 0 18px;
`;

const PaginationWrap = styled.ul`
  width: fit-content;
  height: 22px;
  background-color: ${({ theme }) => theme.paginationStyle.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.paginationStyle.borderColor};
`;

const PaginationItem = styled.li`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.paginationStyle.fontColor};
  transition: 0.3s;

  &:nth-of-type(n + 2) {
    border-left: 1px solid ${({ theme }) => theme.paginationStyle.divideLine};
  }

  &:hover {
    background-color: ${({ theme }) => theme.paginationStyle.hoverBackgroundColor};
    color: ${({ theme }) => theme.paginationStyle.hoverFontColor};
  }

  &:active {
    outline: 3px solid #b0bec5;
  }

  & svg {
    font-size: 24px;
  }

  &[aria-current] {
    background-color: ${({ theme }) => theme.paginationStyle.activeBackgroundColor};
    color: ${({ theme }) => theme.paginationStyle.activeFontColor};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const ResultWrap = styled.div`
  font-size: 12px;

  & select {
    width: 90px;
    height: 24px;
    margin: 0 5px;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    color: #212529;
  }
`;

export default Table;
