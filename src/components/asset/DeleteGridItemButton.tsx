import { TbMinus } from 'react-icons/tb'

interface DeleteGridItemButtonProps {
  onDelete: () => void
}

function DeleteGridItemButton({ onDelete }: DeleteGridItemButtonProps) {
  return (
    <button
      type="button"
      aria-label="delete-grid-item"
      className="absolute -top-4 left-0 transform -translate-x-1/2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1"
      onClick={onDelete}
    >
      <TbMinus size={20} />
    </button>
  )
}

export default DeleteGridItemButton
