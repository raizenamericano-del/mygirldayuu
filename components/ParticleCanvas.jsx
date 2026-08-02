import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let trailParticles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 6 + 4;
        this.speedY = Math.random() * 1.5 + 0.6;
        this.speedX = (Math.random() - 0.5) * 1.0;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.type = Math.random() > 0.6 ? 'heart' : 'petal';
        this.opacity = Math.random() * 0.6 + 0.2;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'heart') {
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          let s = this.size / 4;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-s * 2, -s * 2, -s * 4, s, 0, s * 4);
          ctx.bezierCurveTo(s * 4, s, s * 2, -s * 2, 0, 0);
          ctx.fill();
        } else {
          ctx.fillStyle = '#fb7185';
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Cursor / click trail particles
    class TrailParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3 - 1;
        this.opacity = 1;
        this.color = Math.random() > 0.5 ? '#f43f5e' : '#ffd700';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.03;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(this.opacity, 0);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let s = this.size / 4;
        ctx.translate(this.x, this.y);
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s * 2, -s * 2, -s * 4, s, 0, s * 4);
        ctx.bezierCurveTo(s * 4, s, s * 2, -s * 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    const handlePointerMove = (e) => {
      if (Math.random() > 0.6) {
        trailParticles.push(new TrailParticle(e.clientX, e.clientY));
      }
    };

    const handleClick = (e) => {
      for (let i = 0; i < 12; i++) {
        trailParticles.push(new TrailParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('click', handleClick);

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      trailParticles = trailParticles.filter((tp) => tp.opacity > 0);
      trailParticles.forEach((tp) => {
        tp.update();
        tp.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    }
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
