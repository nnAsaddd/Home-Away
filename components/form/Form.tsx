type ActionType = (
  prevState: any,
  formData: FormData
) => Promise<{ success: boolean; message: string }>;

type FormType = {
  action: any;
  className: string;
  children: React.ReactNode;
};

const Form = (props: FormType) => {
  const { action, className, children } = props;
  return (
    <form action={action} className={className}>
      {children}
    </form>
  );
};
export default Form;
