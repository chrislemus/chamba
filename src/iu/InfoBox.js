const divider = <div style={{ background: '#f8f8f8', height: '1px' }} />;
export function InfoBoxContainer({ children }) {
  return (
    <div
      style={{
        boxShadow:
          'rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px',
        background: '#fff',
        borderRadius: '6px',
      }}
    >
      {children}
    </div>
  );
}

export function InfoBoxHeader({ children }) {
  return (
    <>
      <div style={{ padding: '16px' }}>{children}</div>
      {divider}
    </>
  );
}
export function InfoBoxContent({ children }) {
  return <div style={{ padding: '16px' }}>{children}</div>;
}
