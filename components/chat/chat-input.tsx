import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function ChatInput() {
  return (
    <div className="flex gap-5 relative top-0 mb-5">
      <Input type="text" name="message" placeholder="Message Gemini..." />
      <Button color="primary">Button</Button>
    </div>
  );
}
