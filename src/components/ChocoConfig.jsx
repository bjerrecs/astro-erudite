import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ChocoPackageForm = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ id: "", version: "", packageParameters: "" });

  const handleAddEntry = () => {
    if (newEntry.id && newEntry.version) {
      setEntries((prev) => [...prev, newEntry]);
      setNewEntry({ id: "", version: "", packageParameters: "" });
    }
  };

  const generateXML = () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>\n<packages>\n` +
      entries
        .map(
          (pkg) =>
            `  <package id="${pkg.id}" version="${pkg.version}"${
              pkg.packageParameters ? ` packageParameters="${pkg.packageParameters}"` : ""
            } />`
        )
        .join("\n") +
      `\n</packages>`;
    return xml;
  };

  const handleDownload = () => {
    const blob = new Blob([generateXML()], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "packages.config";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 space-y-4 w-full mx-auto">
      <Card className="w-full">
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-semibold">Add Package</h2>

          <div className="space-y-2">
            <Label>Package ID</Label>
            <Input
              value={newEntry.id}
              onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Version</Label>
            <Input
              value={newEntry.version}
              onChange={(e) => setNewEntry({ ...newEntry, version: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Package Parameters (optional)</Label>
            <Input
              value={newEntry.packageParameters}
              onChange={(e) => setNewEntry({ ...newEntry, packageParameters: e.target.value })}
            />
          </div>

          <Button onClick={handleAddEntry}>Add Package</Button>
        </CardContent>
      </Card>

      {entries.length > 0 && (
        <Card>
          <CardContent className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">Generated package.config</h2>
            <Textarea readOnly value={generateXML()} rows={10} />
            <Button onClick={handleDownload}>Download XML</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChocoPackageForm;
