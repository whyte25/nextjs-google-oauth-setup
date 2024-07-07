import userImg from "@/assests/PNG/user-image-placeholder.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { twMerge } from "tailwind-merge";


export const User = ({ className }: { className?: string }) => {
  const { data, isLoading } = useGetProfile();

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-11 w-11 rounded-full" />
      ) : (
        <>
          {" "}
          <Avatar className="border">
            <AvatarImage
              src={data?.data?.data?.photoUrl! || userImg.src}
              alt="user"
              width={200}
              height={200}
              className="object-cover"
            />
          </Avatar>
        </>
      )}
    </>
  );
};
