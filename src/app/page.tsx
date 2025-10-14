import * as React from "react";
import { Button } from "@heroui/button";
import SetRefreshToken from "../components/RefreshToken/SetRefreshToken";

export default async function Home() {
  return (
    <div>
      <SetRefreshToken />
      <Button color="primary">Press me</Button>
    </div>
  );
}
