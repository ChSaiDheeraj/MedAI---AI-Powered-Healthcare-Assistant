import React, { useState } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, FileText, Send } from 'lucide-react';
import { useVoiceRecording } from '../../hooks/useVoiceRecording';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

export function VoiceRecording() {
  const { language } = useApp();
  const {
    isRecording,
    audioUrl,
    transcription,
    startRecording,
    stopRecording,
    clearRecording
  } = useVoiceRecording();

  const [isPlaying, setIsPlaying] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGeneratePrescription = async () => {
    if (!transcription || !patientName) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // In real app, this would navigate to prescription view
      alert('Prescription generated successfully!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Patient Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t('patientName', language)}
        </h2>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient's full name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Voice Recording Interface */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
        <div className="mb-8">
          <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording 
              ? 'bg-red-100 dark:bg-red-900/20 animate-pulse' 
              : 'bg-blue-100 dark:bg-blue-900/20'
          }`}>
            {isRecording ? (
              <MicOff className="h-16 w-16 text-red-500" />
            ) : (
              <Mic className="h-16 w-16 text-blue-500" />
            )}
          </div>
        </div>

        <div className="space-y-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold text-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <Mic className="h-5 w-5" />
              <span>{t('startRecording', language)}</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold text-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <MicOff className="h-5 w-5" />
              <span>{t('stopRecording', language)}</span>
            </button>
          )}

          {audioUrl && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>Play Recording</span>
              </button>
              <button
                onClick={clearRecording}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>{t('clearRecording', language)}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transcription */}
      {transcription && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('transcription', language)}
            </h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {transcription}
            </p>
          </div>
          
          <button
            onClick={handleGeneratePrescription}
            disabled={!patientName || isProcessing}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>{t('processing', language)}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{t('generatePrescription', language)}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}