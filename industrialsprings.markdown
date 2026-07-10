---
layout: none
title: "Industrial Springs"
---

<style>
    :root {
        --image-y: 30%;
        --cursor-size: 27px;
        --cursor-size-mobile: 54px;
        --cursor-rotation: 25deg;
    }

    body {
        margin: 0;
        overflow: hidden;
    }
    
    main {
        width: 100vw;
        height: 100vh;
        background-image: url('/images/industrial-springs.jpeg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center var(--image-y);
    }
    h1 {
        padding: 4rem;
        font-size: 4rem;
        color: #664E68;
    }

    #spring-cursor {
        position: fixed;
        left: 0;
        top: 0;
        width: var(--cursor-size);
        aspect-ratio: 1 / 1;
        background-image: url('/images/spring-cursor.png');
        background-repeat: no-repeat;
        background-size: contain;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transform: translate(-50%, -50%) rotate(var(--cursor-rotation));
        transition: opacity 120ms linear;
        display: none;
    }

    @media (pointer: fine) {
        body,
        a,
        button,
        input,
        textarea,
        select {
            cursor: none;
        }

        #spring-cursor {
            display: block;
        }
    }

    @media (pointer: coarse) {
        #spring-cursor {
            display: block;
            width: var(--cursor-size-mobile);
        }
    }
</style>

<main>
    <h1>Hello cruel world</h1>
</main>

<div id="spring-cursor" aria-hidden="true"></div>

<script>
    const springCursor = document.getElementById('spring-cursor');
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (springCursor && hasFinePointer) {
        window.addEventListener('mousemove', (event) => {
            springCursor.style.left = `${event.clientX}px`;
            springCursor.style.top = `${event.clientY}px`;
            springCursor.style.opacity = '1';
        });

        window.addEventListener('mouseleave', () => {
            springCursor.style.opacity = '0';
        });
    }

    if (springCursor && hasCoarsePointer) {
        const holdDelayMs = 40;
        const moveTolerancePx = 10;
        const gravityPxPerSec2 = 2600;
        let holdTimer = null;
        let holdActive = false;
        let isFalling = false;
        let fallRaf = null;
        let fallVelocity = 0;
        let lastFrameTime = 0;
        let startX = 0;
        let startY = 0;

        const getCursorSizePx = () => springCursor.getBoundingClientRect().width || 27;

        const setRandomMobileRotation = () => {
            const rotation = (Math.random() * 360) - 180;
            springCursor.style.setProperty('--cursor-rotation', `${rotation}deg`);
        };

        const positionCursor = (touch) => {
            springCursor.style.left = `${touch.clientX}px`;
            springCursor.style.top = `${touch.clientY}px`;
        };

        const clearHoldTimer = () => {
            if (holdTimer) {
                window.clearTimeout(holdTimer);
                holdTimer = null;
            }
        };

        const stopFalling = () => {
            if (fallRaf) {
                window.cancelAnimationFrame(fallRaf);
                fallRaf = null;
            }
            isFalling = false;
            fallVelocity = 0;
            lastFrameTime = 0;
        };

        const startFalling = () => {
            stopFalling();
            isFalling = true;

            const step = (now) => {
                if (!isFalling) {
                    return;
                }

                if (!lastFrameTime) {
                    lastFrameTime = now;
                }

                const deltaSec = (now - lastFrameTime) / 1000;
                lastFrameTime = now;
                fallVelocity += gravityPxPerSec2 * deltaSec;

                const currentTop = parseFloat(springCursor.style.top || '0');
                const nextTop = currentTop + (fallVelocity * deltaSec);
                springCursor.style.top = `${nextTop}px`;

                if (nextTop > window.innerHeight + getCursorSizePx()) {
                    springCursor.style.opacity = '0';
                    stopFalling();
                    return;
                }

                fallRaf = window.requestAnimationFrame(step);
            };

            fallRaf = window.requestAnimationFrame(step);
        };

        const hideCursor = () => {
            stopFalling();
            springCursor.style.opacity = '0';
            holdActive = false;
            clearHoldTimer();
        };

        window.addEventListener('touchstart', (event) => {
            const touch = event.touches[0];
            if (!touch) {
                return;
            }

            startX = touch.clientX;
            startY = touch.clientY;
            setRandomMobileRotation();
            stopFalling();
            positionCursor(touch);
            springCursor.style.opacity = '0';
            holdActive = false;
            clearHoldTimer();

            holdTimer = window.setTimeout(() => {
                holdActive = true;
                springCursor.style.opacity = '1';
            }, holdDelayMs);
        }, { passive: true });

        window.addEventListener('touchmove', (event) => {
            const touch = event.touches[0];
            if (!touch) {
                return;
            }

            const movedX = Math.abs(touch.clientX - startX);
            const movedY = Math.abs(touch.clientY - startY);
            if (!holdActive && (movedX > moveTolerancePx || movedY > moveTolerancePx)) {
                clearHoldTimer();
            }

            if (holdActive) {
                positionCursor(touch);
                springCursor.style.opacity = '1';
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            clearHoldTimer();

            if (holdActive) {
                holdActive = false;
                startFalling();
                return;
            }

            hideCursor();
        }, { passive: true });

        window.addEventListener('touchcancel', hideCursor, { passive: true });
    }
</script>
