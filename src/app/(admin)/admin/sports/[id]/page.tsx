import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SportIcon } from "@/components/icons/sport-icon";
import { SPORTS } from "@/data/sports";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SportDetailPage({ params }: PageProps) {
  const { id } = await params;
  const sport = SPORTS.find((s) => s.id === id);

  if (!sport) {
    notFound();
  }

  return (
    <section className="flex flex-col">
      <Card className="border border-border rounded-[16px] bg-white p-6 shadow-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <h1 className="text-h2 text-text-primary">Sport Details</h1>

          <div className="flex items-center gap-4 rounded-[12px] border border-border bg-light p-6">
            <SportIcon sport={sport.sport} iconSvg={sport.iconSvg} colorHex={sport.colorHex} />
            <div className="flex flex-col gap-1">
              <span className="text-h3 text-text-primary">{sport.name}</span>
              <span className="text-small text-text-secondary">ID: {sport.id}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[12px] border border-border bg-light p-6">
            <span className="text-small font-semibold text-text-secondary">
              Coming soon
            </span>
            <p className="text-body text-text-primary">
              Sport management actions (edit, delete, image upload) are not
              built yet. This route is a placeholder until the admin back
              office data layer lands.
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