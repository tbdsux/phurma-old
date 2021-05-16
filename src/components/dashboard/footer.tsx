export const DashFooter = () => {
  return (
    <>
      <hr />
      <footer className="w-5/6 mx-auto py-10 flex items-center justify-between">
        <h3 className="font-bold tracking-wide text-purple-500">phurma</h3>

        <p className="text-sm text-gray-700">&copy; 2021 | All Rights Reserved</p>

        <ul className="text-sm text-gray-500">
          <li>
            <a href="#">Github</a>
          </li>
          <li>
            <a href="#">Quaker</a>
          </li>
          <li>
            <a href="#">LCL Paste</a>
          </li>
        </ul>
      </footer>
    </>
  );
};
