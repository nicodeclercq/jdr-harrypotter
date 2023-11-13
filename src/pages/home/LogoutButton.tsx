import { Icon } from "../../components/icons/Icon";

export function LogoutButton() {
  const logout = () => {
    // @ts-expect-error
    window.app.clear();
  };

  return (
    <div className="fixed top-4 right-4">
      <button
        className="flex items-center justify-center bg-transparent text-l text-white rounded-full w-8 h-8 ease-in transition-transform hover:bg-red-700 hover:scale-150 border p-2"
        type="button"
        onClick={logout}
      >
        <Icon name="EXIT_DOOR" />
      </button>
    </div>
  );
}
