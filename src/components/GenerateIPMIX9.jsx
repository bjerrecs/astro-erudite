import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import pkg from 'crypto-js';
const {HmacSHA1, enc} = pkg;

export default function GenerateIPMIX9() {
  const [mac, setMac] = useState("");
  const [hashed, setHashed] = useState("");

  const handleHash = () => {
    try {
      const keyHex = "8544E3B47ECA58F9583043F8";
      const cleanMac = mac.replace(/[^a-fA-F0-9]/g, "").toUpperCase();

      if (cleanMac.length !== 12) {
        setHashed("Invalid MAC format (expected 12 hex characters)");
        return;
      }

      const wordArray = enc.Hex.parse(cleanMac);
      const hmac = HmacSHA1(wordArray, enc.Hex.parse(keyHex)).toString(enc.Hex).toUpperCase();
      const shortHex = hmac.substring(0, 24);
      const dashed = shortHex.replace(/(.{4})(.{4})(.{4})(.{4})(.{4})(.*)/, "$1-$2-$3-$4-$5-$6");

      setHashed(dashed);
    } catch (err) {
      setHashed("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="rounded-2xl shadow-md p-4">
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mac">IPMI MAC Address</Label>
            <Input
              id="mac"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
              placeholder="002590cd26da or 00:25:90:cd:26:da"
            />
          </div>
          <Button onClick={handleHash}>Generate Hash</Button>
          {hashed && (
            <div className="break-all font-mono text-sm border rounded p-2 bg-muted">
              {hashed}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
