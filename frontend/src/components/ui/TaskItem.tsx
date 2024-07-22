import StarOutline from "./StarOutline.tsx";
import { StarIcon } from "@heroicons/react/24/solid";

interface TaskItemProps {
  name: string,
  bookmarked: boolean,
  handleBookmark: () => void,
}

const TaskItem = ({ name, bookmarked, handleBookmark }: TaskItemProps) => {
  return (
    <div key={name}
         className="py-1 px-5 flex flex-row items-center group hover:bg-aquaGreen-50">
      <h1
        className="cursor-default flex-1 text-gray-500 font-semibold group-hover:text-aquaGreen-100">{name}</h1>
      <div onClick={handleBookmark}>
        {BookmarkIcon(bookmarked)}
      </div>
    </div>
  );
};

const BookmarkIcon = (bookmarked: boolean) => {
  return (
    <>
      {bookmarked ?
        <StarIcon className="size-5 text-aquaGreen-100 hover:text-gray-500" /> :
        <StarOutline className="text-gray-500 size-5 hover:text-aquaGreen-100" />
      }
    </>
  );
};

export default TaskItem;