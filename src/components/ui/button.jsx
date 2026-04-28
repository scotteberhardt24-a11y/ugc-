export function Button({ className = "", children, variant, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
