import styles from "./Table.module.scss";

type TableProps = {
	columns: string[];
	rows: (string | number)[][];
	actions?: {
		index: number,
		actionPayloadIndex?: number,
		action: (payload: string) => void,
	}[];
  isSubmitting?: boolean;
};
export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  actions,
  isSubmitting = false,
}) => {

  return (
    <table className={styles["table"]}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((value, index) => (
          <tr key={value?.[0] ?? index }>
            {value.map((val, index) => {
              const columnAction = actions?.find((action) => action.index === index);
              if(actions && columnAction && columnAction.actionPayloadIndex !== undefined) {
                const actionPayload = value[columnAction.actionPayloadIndex] ?? "";
                return (
                  <td key={index} className={styles["action"]}>
                    <button onClick={() => columnAction.action(actionPayload.toString())} disabled={isSubmitting}>
                      {val}
                    </button>
                  </td>
                );
              } else {
                return (
                  <td key={index}>{val}</td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};