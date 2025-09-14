 let stream;
        let consultationHistory = JSON.parse(localStorage.getItem('consultationHistory')) || [];

        const formSection = document.getElementById('formSection');
        const videoSection = document.getElementById('videoSection');
        const consultationForm = document.getElementById('consultationForm');
        const videoStream = document.getElementById('videoStream');
        const toggleVideo = document.getElementById('toggleVideo');
        const toggleAudio = document.getElementById('toggleAudio');
        const endCall = document.getElementById('endCall');
        const callEnded = document.getElementById('callEnded');
        const historyList = document.getElementById('historyList');

        // Add mock data if empty
        if (consultationHistory.length === 0) {
            consultationHistory = [
                { patientName: 'John Doe', doctor: 'Dr. Emily Carter', date: '2023-05-15', time: '10:00', symptoms: 'Chest pain' },
                { patientName: 'Jane Smith', doctor: 'Dr. Marcus Johnson', date: '2023-06-20', time: '14:30', symptoms: 'Headache' },
                { patientName: 'Bob Johnson', doctor: 'Dr. Sophia Lee', date: '2023-07-10', time: '09:15', symptoms: 'Child vaccination' }
            ];
            localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
        }

        consultationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const patientName = document.getElementById('patientName').value;
            const doctor = document.getElementById('doctorSelect').value;
            const date = document.getElementById('consultDate').value;
            const time = document.getElementById('consultTime').value;
            const symptoms = document.getElementById('symptoms').value;

            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                videoStream.srcObject = stream;
                formSection.style.display = 'none';
                videoSection.style.display = 'block';

                // Add to history
                consultationHistory.unshift({ patientName, doctor, date, time, symptoms });
                localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
                renderHistory();
            } catch (err) {
                alert('Unable to access camera/microphone. Please check permissions.');
                console.error('Error accessing media devices:', err);
            }
        });

        toggleVideo.addEventListener('click', () => {
            if (stream) {
                const videoTracks = stream.getVideoTracks();
                videoTracks.forEach(track => {
                    track.enabled = !track.enabled;
                });
                toggleVideo.querySelector('i').className = videoTracks[0]?.enabled ? 'fas fa-video' : 'fas fa-video-slash';
                toggleVideo.classList.toggle('btn-muted', !videoTracks[0]?.enabled);
            }
        });

        toggleAudio.addEventListener('click', () => {
            if (stream) {
                const audioTracks = stream.getAudioTracks();
                audioTracks.forEach(track => {
                    track.enabled = !track.enabled;
                });
                toggleAudio.querySelector('i').className = audioTracks[0]?.enabled ? 'fas fa-microphone' : 'fas fa-microphone-slash';
                toggleAudio.classList.toggle('btn-muted', !audioTracks[0]?.enabled);
            }
        });

        endCall.addEventListener('click', () => {
            if (stream) {
                // Stop all tracks
                stream.getTracks().forEach(track => {
                    console.log('Stopping track:', track.kind);
                    track.stop();
                });
                videoStream.srcObject = null;
                // Clear the stream reference
                stream = null;
            }
            // Show ended message
            callEnded.classList.add('show');
            setTimeout(() => {
                videoSection.style.display = 'none';
                formSection.style.display = 'block';
                callEnded.classList.remove('show');
                consultationForm.reset();
            }, 2000);
        });

        function renderHistory() {
            historyList.innerHTML = '';
            consultationHistory.forEach((item, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'mb-4 p-4 bg-gray-50 rounded-lg';
                historyItem.innerHTML = `
                    <p class="font-semibold">${item.patientName}</p>
                    <p class="text-sm text-gray-600">Dr: ${item.doctor.split(' (')[0]}</p>
                    <p class="text-sm text-gray-600">${item.date} at ${item.time}</p>
                    <p class="text-xs text-gray-500">Symptoms: ${item.symptoms.slice(0, 100)}...</p>
                `;
                historyList.appendChild(historyItem);
            });
        }

        renderHistory();