import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewSportPage() {
  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <h1 className="text-h2 text-text-primary">New Sport</h1>
          <div className="flex flex-col gap-3 rounded-[12px] border border-border bg-light p-6">
            <span className="text-small font-semibold text-text-secondary">
              Coming soon
            </span>
            <p className="text-body text-text-primary">
              The sport creation form is not built yet. Bookings, courts, and
              sports data is still mocked — this route is a placeholder until
              the admin back office data layer lands.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/admin/sports" />}
              className="h-14 px-8 cursor-pointer rounded-[12px] border-border bg-white text-primary font-semibold hover:bg-light"
            >
              Back to Sports
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}