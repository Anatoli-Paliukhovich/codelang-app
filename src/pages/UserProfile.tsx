import { useLoaderData } from "react-router-dom";
import { StatisticsItem } from "@/components";
import { type UserProfileLoaderData } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
  const { user, statistic } = useLoaderData() as UserProfileLoaderData;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">{user.username}'s Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong className="text-primary">Username:</strong>{" "}
                {user.username}
              </p>
              <p>
                <strong className="text-primary">Role:</strong> {user.role}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <StatisticsItem
                label="Snippets"
                value={statistic.snippetsCount}
              />
              <StatisticsItem label="Rating" value={statistic.rating} />
              <StatisticsItem
                label="Comments"
                value={statistic.commentsCount}
              />
              <StatisticsItem label="Likes" value={statistic.likesCount} />
              <StatisticsItem
                label="Dislikes"
                value={statistic.dislikesCount}
              />
              <StatisticsItem
                label="Questions"
                value={statistic.questionsCount}
              />
              <StatisticsItem
                label="Correct Answers"
                value={statistic.correctAnswersCount}
              />
              <StatisticsItem
                label="Regular Answers"
                value={statistic.regularAnswersCount}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
