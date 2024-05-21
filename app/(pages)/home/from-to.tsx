import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
  } from "lucide-react"
  
  import { Badge } from "../../components/ui/badge"
  import { Button } from "../../components/ui/button"
 import { Card } from "@/app/components/ui/card"
  import { Input } from "../../components/ui/input"
  import { Label } from "../../components/ui/label"

  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "../../components/ui/tooltip"
  
  export default function FromTo() {
    return (
      <div className="grid h-screen w-full pl-[56px]">
    
                <form className="grid lg:grid-cols-2 w-full items-start gap-6 overflow-auto p-4 pt-0">
                  <Card>
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      From
                    </legend>
                     
                    <div className="grid gap-3">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="text" placeholder="0.4" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-p">Top P</Label>
                      <Input id="top-p" type="number" placeholder="0.7" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-k">Top K</Label>
                      <Input id="top-k" type="number" placeholder="0.0" />
                    </div>
                  </fieldset>
                  </Card>
                  <Card>
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      To
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="text" placeholder="0.4" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-p">Top P</Label>
                      <Input id="top-p" type="number" placeholder="0.7" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-k">Top K</Label>
                      <Input id="top-k" type="number" placeholder="0.0" />
                    </div>
                  </fieldset>
                  </Card>
                </form>
              
      </div>
    )
  }
  