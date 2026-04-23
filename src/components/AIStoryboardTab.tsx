import { MagicStoryWizard } from '@/features/storyboard';

/**
 * AIStoryboardTab — Now uses the interactive MagicStoryWizard.
 * This component is kept as a wrapper for backward compatibility
 * (it's imported by both the teacher dashboard and the public AI Story page).
 */
const AIStoryboardTab = () => {
    return <MagicStoryWizard />;
};

export default AIStoryboardTab;
