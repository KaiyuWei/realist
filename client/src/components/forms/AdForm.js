/**
 * a component of form that allows users to create an ad
 */

export default function AdForm({ action, type }) {
  return (
    <>
      <p>This is ad create form</p>
      {action} / {type}
    </>
  );
}
