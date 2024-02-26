import { MdDeleteOutline, MdEditCalendar } from 'react-icons/md';

export function RowAddOn(props, deleteFunc, updateFunc) {
  return (
    <div className="editWrap">
      <div className="editTitle">{props.valueFormatted || props.value}</div>
      <div className="editIcon">
        {deleteFunc && (
          <MdDeleteOutline
            onClick={() => {
              deleteFunc(props);
            }}
          />
        )}
        {updateFunc && (
          <MdEditCalendar
            onClick={() => {
              updateFunc(props);
            }}
          />
        )}
      </div>
    </div>
  );
}
