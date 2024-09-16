import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

export default function Home() {
  return (
    <div>
      <div className="flex gap-5">
        <Input type="text" name="message" placeholder="Message Gemini..." />
        <Button color="primary">Button</Button>
      </div>
    </div>
  );
}
