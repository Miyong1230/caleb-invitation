import { getContent } from "@/lib/store";
import InvitationExperience from "@/components/InvitationExperience";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <InvitationExperience content={content} />;
}
