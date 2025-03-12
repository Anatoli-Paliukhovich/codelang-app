import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  ChangePasswordForm,
  ChangeUserName,
  ErrorElement,
  StatisticsItem,
} from "@/components";
import { CircleUserRound, SquareArrowRight, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { customFetch } from "@/utils";
import { useEffect, useState } from "react";
import { type Statistic } from "@/utils";
import { toast } from "sonner";
import { logoutUser } from "@/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState?.user);
  const userName = user ? user.username : "Guest";
  const userId = user ? user.id : "";
  const userRole = user ? user.role : "User  ";
  const [statistic, setStatistic] = useState<Statistic>();
  const [error, setError] = useState<string | null>(null);

  const {
    snippetsCount = 0,
    regularAnswersCount = 0,
    rating = 0,
    questionsCount = 0,
    likesCount = 0,
    dislikesCount = 0,
    correctAnswersCount = 0,
    commentsCount = 0,
  } = statistic || {};

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const statisticResponse = await customFetch.get(
            `/users/${userId}/statistic`
          );
          setStatistic(statisticResponse.data.data.statistic);
        } catch (err) {
          console.error("Error fetching statistics:", err);
          setError("Failed to fetch statistics.");
        }
      }
    };

    fetchData();
  }, [userId]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleAccountDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await customFetch.delete("/me");
        if (response.status === 200) {
          handleLogout();
          toast("Account deleted successfully!");
        }
      } catch (err) {
        console.error("Error deleting account:", err);
        setError("Failed to delete account.");
      }
    }
  };

  if (error) {
    return <ErrorElement></ErrorElement>;
  }

  return (
    <>
      <h2 className="text-center py-5 text-4xl font-bold">
        Welcome, <span className="text-primary italic">{userName}</span>
      </h2>
      <Card className="my-10">
        <CardContent>
          <div className="space-y-2 flex justify-center items-center gap-10">
            <CircleUserRound className="opacity-10 w-26 h-26 md:w-56 md:h-56 text-muted-foreground" />
            <div className="flex flex-col gap-4">
              <p className="font-bold">{userName}</p>
              <p className="text-muted-foreground italic">Id: {userId}</p>
              <p className="text-muted-foreground italic">Role: {userRole}</p>
              <div className="flex gap-3">
                <Button
                  className="bg-chart-1 cursor-pointer"
                  onClick={handleLogout}
                >
                  <SquareArrowRight />
                </Button>
                <Button
                  className="bg-destructive cursor-pointer"
                  onClick={handleAccountDelete}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <StatisticsItem label="Snippets" value={snippetsCount} />
            <StatisticsItem label="Rating" value={rating} />
            <StatisticsItem label="Comments" value={commentsCount} />
            <StatisticsItem label="Likes" value={likesCount} />
            <StatisticsItem label="Dislikes" value={dislikesCount} />
            <StatisticsItem label="Questions" value={questionsCount} />
            <StatisticsItem
              label="Correct Answers"
              value={correctAnswersCount}
            />
            <StatisticsItem
              label="Regular Answers"
              value={regularAnswersCount}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <p className="mx-3 underline text-muted-foreground">
          Edit your profile:
        </p>
        <div className="gap-5 mx-3 flex flex-col md:flex-row">
          <div className="flex flex-col gap-4 flex-1/2">
            <p className="font-medium">Change your username:</p>
            <ChangeUserName />
          </div>
          <div className="flex flex-col gap-4 flex-1/2">
            <p className="font-medium">Change your password:</p>
            <ChangePasswordForm />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Account;
