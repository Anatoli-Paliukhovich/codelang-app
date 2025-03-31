const StatisticsItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="text-sm text-primary">{label}</span>
        <span className="text-lg font-semibold">{value}</span>
      </div>
    </>
  );
};
export default StatisticsItem;
