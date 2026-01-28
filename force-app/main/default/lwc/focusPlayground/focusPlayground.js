import { LightningElement, track } from 'lwc';

export default class FocusPlayground extends LightningElement {

    showComment = false;
    @track isModalOpen = false;

    /**
     * ========================================================
     * BASIC FOCUS EXAMPLE
     * ========================================================
     * Move focus to the Name input.
     */
    handleFocusName() {
        const inputEl = this.template.querySelector('.name-input');
        if (inputEl) {
            inputEl.focus();
        }
    }

    /**
     * ========================================================
     * DYNAMIC FOCUS EXAMPLE
     * ========================================================
     * Toggle rendering and then focus the new element once rendered.
     */
    showCommentInput() {
        // Show the comment input
        this.showComment = true;

        // Next render, move focus to the new input
        // Use a microtask to ensure rendering completed
        requestAnimationFrame(() => {
            const commentEl =
                this.template.querySelector('.comment-input');
            if (commentEl) {
                commentEl.focus();
            }
        });
    }

    /**
     * ========================================================
     * MODAL FOCUS TRAP EXAMPLE
     * ========================================================
     * Open modal and trap focus inside.
     */
    openModal() {
        this.isModalOpen = true;

        // Focus the modal container immediately after open
        requestAnimationFrame(() => {
            const modal =
                this.template.querySelector('.modal-container');
            if (modal) {
                modal.focus();
            }
        });
    }

    /**
     * Closing modal returns focus to the triggering button.
     */
    closeModal() {
        this.isModalOpen = false;

        // Wait for modal to be removed then refocus
        // the original open button
        requestAnimationFrame(() => {
            const btn =
                this.template.querySelector('.open-modal-btn');
            if (btn) {
                btn.focus();
            }
        });
    }
}
