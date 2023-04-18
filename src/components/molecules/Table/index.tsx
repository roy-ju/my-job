import tw, { styled } from 'twin.macro';
import { ReactNode, useCallback, useContext, useMemo } from 'react';
import { useControlled } from '@/hooks/utils';
import ChevronDown from '@/assets/icons/chevron_down_24.svg';
import ExpandableGroupContext from './ExpandableGroupContext';

const Table = styled.table`
  ${tw`w-full table-fixed text-b2`}
  tr:not(tbody[aria-label='grouped'] tr:not(:last-of-type)) {
    ${tw`border-b border-b-gray-300`}
  }
`;

const TableBody = tw.tbody``;

const TableRow = tw.tr``;

const TableHead = tw.th`align-top py-2 mr-3 font-normal text-gray-700 text-start w-[40%]`;

const TableData = tw.td`py-2 pl-3 align-top w-[60%] break-all`;

interface ExpandableGroupProps {
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  children?: ReactNode;
  defaultExpanded?: boolean;
}

function TableGroup({ expanded: expandedProp, onChange, children, defaultExpanded = false }: ExpandableGroupProps) {
  const [expanded, setExpanded] = useControlled({ controlled: expandedProp, default: defaultExpanded });

  const handleChange = useCallback(
    (value: boolean) => {
      setExpanded(value);
      onChange?.(value);
    },
    [setExpanded, onChange],
  );

  const context = useMemo(() => ({ expanded, onChange: handleChange }), [expanded, handleChange]);

  return <ExpandableGroupContext.Provider value={context}>{children}</ExpandableGroupContext.Provider>;
}

const SummaryButton = tw.th`py-2 mr-3 font-normal text-gray-700 text-start hover:bg-gray-100 hover:cursor-pointer`;

function TableGroupSummary({ children }: { children: ReactNode }) {
  const { expanded, onChange } = useContext(ExpandableGroupContext);

  return (
    <TableBody>
      <TableRow style={expanded ? { borderBottomColor: 'transparent' } : undefined}>
        <SummaryButton colSpan={2} onClick={() => onChange?.(!expanded)}>
          <div tw="flex items-center justify-between">
            <div>{children}</div>
            <div css={[tw`transition-transform`, expanded && tw`rotate-180`]}>
              <ChevronDown />
            </div>
          </div>
        </SummaryButton>
      </TableRow>
    </TableBody>
  );
}

function TableGroupDetails({ children }: { children: ReactNode }) {
  const { expanded } = useContext(ExpandableGroupContext);

  return (
    <TableBody aria-label="grouped" css={[tw`overflow-hidden`, !expanded && tw`hidden`]}>
      {children}
    </TableBody>
  );
}

export default Object.assign(Table, {
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Data: TableData,
  Group: TableGroup,
  GroupSummary: TableGroupSummary,
  GroupDetails: TableGroupDetails,
});
