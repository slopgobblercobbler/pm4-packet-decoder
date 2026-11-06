#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItStrmoutBufferUpdateDef {
    static constexpr std::uint8_t opcode = 0x34;
    static constexpr std::string_view name = "IT_STRMOUT_BUFFER_UPDATE";
    static constexpr std::string_view desc = "Update GPU stream-out write pointer buffer descriptors";
};
}
