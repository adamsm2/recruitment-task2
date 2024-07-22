import { StarIcon } from "@heroicons/react/24/outline";

interface StarOutlineProps {
  className: string;
}

const StarOutline = ({ className }: StarOutlineProps) => {
  return (
    <StarIcon className={className} />
  );
};

export default StarOutline;
