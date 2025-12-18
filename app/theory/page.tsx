/**
 * COMPONENT TYPE: Page
 * SECTION: Theory Pages
 *
 * ROLE:
 * - Redirect to home page which shows pattern categories
 * - Legacy route support
 *
 * PATTERNS USED:
 * - Redirect pattern - Theory content now on home
 *
 * NOTES FOR CONTRIBUTORS:
 * - Main content moved to / (home)
 * - This redirect maintains backward compatibility
 */

import { redirect } from "next/navigation";

export default function TheoryPage() {
    redirect("/");
}
