export interface ATFDataProps {
  ATFData: {
    title: string;
    subtitle: string;
    imageURL: string;
    actionNote: string;
  };
  setATFData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      subtitle: string;
      imageURL: string;
      actionNote: string;
    }>
  >;
}
