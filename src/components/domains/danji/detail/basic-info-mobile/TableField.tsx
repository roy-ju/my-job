import { Table } from '@/components/molecules';

type TableFieldProps = {
  isRender?: boolean;
  title: string;
  data: React.ReactNode;
};

function TableField({ isRender = true, title, data }: TableFieldProps) {
  if (!isRender) return null;

  return (
    <Table.Row>
      <Table.Head>{title}</Table.Head>
      <Table.Data>{data}</Table.Data>
    </Table.Row>
  );
}

export default TableField;
